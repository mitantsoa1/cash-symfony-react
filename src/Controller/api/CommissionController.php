<?php

namespace App\Controller\api;

use App\Controller\admin\BaseController;
use App\Entity\Commission;
use App\Repository\CommissionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/commission', name: 'commission', methods: ['GET'])]
class CommissionController extends BaseController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(CommissionRepository $commissionRepository): Response
    {

        $commissions = $commissionRepository->findBy([], ['id' => 'DESC']);
        return $this->json($commissions);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    #[Route('/edit/{id}', name: 'edit', methods: ['POST'])]
    public function create(Request $request, Commission $commission = null): Response
    {

        if (!$commission) {

            $commission = new Commission();
        }

        $content = json_decode($request->getContent());
        $commission->setOperateur($content->operateur);
        // $commission->setType($content->type);
        $commission->setMin($content->min);
        $commission->setMax($content->max);
        $commission->setRetrait($content->retrait);
        $commission->setDepot($content->depot);

        $this->save($commission);

        return $this->json(['status' => "success", 'message' => 'Commission crée']);

        // return $this->json(['status' => "error", 'message' => 'Erreur']);
    }
}
