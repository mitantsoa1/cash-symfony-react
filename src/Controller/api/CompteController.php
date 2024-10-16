<?php

namespace App\Controller\api;

use App\Controller\admin\BaseController;
use App\Entity\Compte;
use App\Repository\CompteRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/compte', name: 'api.compte.')]
class CompteController extends BaseController
{

    #[Route('/mail', name: 'mail.index', methods: ['GET'])]
    public function sendTestEmail(MailerInterface $mailer)
    {
        try {
            $email = (new Email())
                ->from('test@example.com')
                ->to('recipient@example.com')
                ->subject('Test Email')
                ->text('This is a test email in cash');

            $mailer->send($email);

            return $this->json(true);
        } catch (\Exception $e) {
            // Log the error or return it for debugging
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(CompteRepository $compteRepository): Response
    {

        $comptes = $compteRepository->findBy([], ['id' => 'DESC']);
        return $this->json($comptes);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    #[Route('/edit/{id}', name: 'edit', methods: ['POST'])]
    public function create(Request $request, Compte $compte = null): Response
    {

        if (!$compte) {

            $compte = new Compte();
        }

        $content = json_decode($request->getContent());
        $compte->setOperateur($content->operateur);
        $compte->setSolde($content->solde);
        $compte->setObservation($content->observation);
        $compte->setIsTransaction(false);

        $this->save($compte);

        return $this->json(['status' => "success", 'message' => 'Compte crée']);

        return $this->json(['status' => "error", 'message' => 'Erreur']);
    }
}
