<?php

namespace App\Controller\api;

use App\Controller\admin\BaseController;
use App\Repository\GainRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/gain', name: 'api.gain.')]
class GainController extends BaseController
{
    #[Route('/', name: 'index')]
    public function index(GainRepository $gainRepository): Response
    {
        $gains = $gainRepository->findBy([], ['id' => 'DESC']);
        return $this->json($gains);
    }
}
