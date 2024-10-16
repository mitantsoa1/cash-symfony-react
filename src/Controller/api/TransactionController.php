<?php

namespace App\Controller\api;

use App\Controller\admin\BaseController;
use App\Entity\Compte;
use App\Entity\Gain;
use App\Entity\Transaction;
use App\Repository\CommissionRepository;
use App\Repository\CompteRepository;
use App\Repository\TransactionRepository;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/transaction', name: 'api.transaction.')]
class TransactionController extends BaseController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(TransactionRepository $transactionRepository): Response
    {
        $transactions = $transactionRepository->findBy([], ['id' => 'DESC']);
        return $this->json($transactions);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    #[Route('/edit/{id}', name: 'edit', methods: ['POST'])]
    public function create(Request $request, Transaction $transaction = null, Compte $compte = null, CommissionRepository $commissionRepository, CompteRepository $compteRepository): Response
    {

        if (!$transaction) {

            $transaction = new Transaction();
        }

        $content = json_decode($request->getContent());
        $transaction->setOperateur($content->operateur);
        $transaction->setType($content->type);
        $montant = floatval($content->montant);
        $transaction->setMontant($montant);
        $transaction->setTel($content->tel);
        $transaction->setReference($content->reference);
        $transaction->setCreatedAt(new \DateTimeImmutable());

        $totalCompte = $compteRepository->CalculSomme($content->operateur);

        if ($totalCompte - $montant <= 0 && $content->type == "depot")
            return $this->json(['status' => "error", 'message' => 'Solde insuffisant']);

        $this->save($transaction);
        $compte = new Compte();

        $compte->setOperateur($content->operateur);
        $solde = $content->type == 'depot' ? floatval($content->montant * -1) : $montant;

        $compte->setSolde($solde);
        $compte->setObservation($content->type . " - ref: " . $content->reference . " - tel: " . $content->tel);
        $compte->setIsTransaction(true);

        $this->save($compte);

        $gain = new Gain();

        $com = $commissionRepository->findCommissionByTypeAndMontant($content->operateur, $content->type, $montant);

        if ($com == null) {
            $comRetrait = 0;
            $comDepot = 0;
        } else {
            $comRetrait = $com->retrait;
            $comDepot = $com->depot;
        }

        $gain->setOperateur($content->operateur);
        $gain->setType($content->type);

        switch ($content->type) {
            case 'retrait':
                # code...
                $gain->setMontant($comRetrait);
                break;
            case 'depot':
                # code...
                $gain->setMontant($comDepot);
                break;

            default:
                # code...
                $gain->setMontant(0);
                break;
        }

        $this->save($gain);


        // return $this->json(['status' => "success", 'message' => 'Transaction cree']);
        return $this->json($transaction);

        // return $this->json(['status' => "error", 'message' => 'Erreur']);
    }
}
