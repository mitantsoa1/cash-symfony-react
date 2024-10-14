<?php

namespace App\Controller\api;

use App\Controller\admin\BaseController;
use App\Entity\Transaction;
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
    public function create(Request $request, Transaction $transaction = null): Response
    {

        if (!$transaction) {

            $transaction = new Transaction();
        }

        $content = json_decode($request->getContent());
        $transaction->setOperateur($content->operateur);
        $transaction->setType($content->type);
        $transaction->setMontant($content->montant);
        $transaction->setTel($content->tel);
        $transaction->setReference($content->reference);
        $transaction->setCreatedAt(new \DateTimeImmutable());

        $this->save($transaction);

        // return $this->json(['status' => "success", 'message' => 'Transaction cree']);
        return $this->json($transaction);

        // return $this->json(['status' => "error", 'message' => 'Erreur']);
    }
}
