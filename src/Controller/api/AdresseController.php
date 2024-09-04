<?php

namespace App\Controller\api;

use App\Controller\admin\BaseController;
use App\Entity\Adresse;
use App\Repository\AdresseRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/adresse', name: 'api.adresse.')]
class AdresseController extends BaseController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(AdresseRepository $adresseRepository): Response
    {
        $adresses = $adresseRepository->findBy([], ['id' => 'DESC']);
        return $this->json($adresses);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    #[Route('/edit/{id}', name: 'edit', methods: ['POST'])]
    public function create(Request $request, Adresse $adresse = null): Response
    {

        if (!$adresse) {

            $adresse = new Adresse();
        }

        $content = json_decode($request->getContent());

        $adresse->setAdresse($content->adress);
        $adresse->setLieu($content->lieu);

        $this->save($adresse);

        return $this->json(['status' => "success", 'message' => 'adresse crée']);

        return $this->json(['status' => "error", 'message' => 'Erreur']);
    }
}