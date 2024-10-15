<?php

namespace App\Controller\api;

use App\Controller\admin\BaseController;
use App\Entity\Frais;
use App\Repository\FraisRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/frais', name: 'frais.')]
class FraisController extends BaseController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(FraisRepository $fraisRepository): Response
    {

        $fraiss = $fraisRepository->findBy([], ['id' => 'DESC']);
        return $this->json($fraiss);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    #[Route('/edit/{id}', name: 'edit', methods: ['POST'])]
    public function create(Request $request, Frais $frais = null): Response
    {

        if (!$frais) {

            $frais = new Frais();
        }

        $content = json_decode($request->getContent());
        $frais->setOperateur($content->operateur);
        $frais->setType($content->type);
        $frais->setMin($content->min);
        $frais->setMax($content->max);
        $frais->setMontant($content->montant);

        $this->save($frais);

        return $this->json(['status' => "success", 'message' => 'Compte crée']);

        return $this->json(['status' => "error", 'message' => 'Erreur']);
    }
}
