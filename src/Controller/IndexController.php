<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class IndexController extends AbstractController
{

    #[Route('/', name: 'app')]
    #[Route('/{entry}', name: 'app.entry', requirements: ['entry' => '^(?!api|logout).*$'])]
    public function app(): Response
    {
        return $this->render('base.html.twig');
    }
}
