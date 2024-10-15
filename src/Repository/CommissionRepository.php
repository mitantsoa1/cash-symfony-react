<?php

namespace App\Repository;

use App\Entity\Commission;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Commission>
 */
class CommissionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Commission::class);
    }

    //    /**
    //     * @return Commission[] Returns an array of Commission objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    public function findCommission($operateur, $type, $montant): ?Commission
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.operateur = :op')
            ->andWhere('c.type = :typ')
            ->andWhere('c.min <= :montant')
            ->andWhere('c.max >= :montant')
            ->setParameter('op', $operateur)
            ->setParameter('typ', $type)
            ->setParameter('montant', $montant)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    public function findCommissionByTypeAndMontant($operateur, $type, $montant): ?Commission
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.operateur = :op')
            ->andWhere('c.min <= :montant')
            ->andWhere('c.max >= :montant')
            ->setParameter('op', $operateur)
            ->setParameter('montant', $montant)
            ->getQuery()
            ->getOneOrNullResult(); // Utilise cette méthode pour éviter l'erreur
    }
}
