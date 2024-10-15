<?php

namespace App\Entity;

use App\Repository\CommissionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommissionRepository::class)]
class Commission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $operateur = null;

    // #[ORM\Column(length: 50)]
    // private ?string $type = null;

    #[ORM\Column]
    private ?float $min = null;

    #[ORM\Column]
    private ?float $max = null;

    #[ORM\Column(name: "retrait")]
    public ?float $retrait = null;

    #[ORM\Column]
    public ?float $depot = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOperateur(): ?string
    {
        return $this->operateur;
    }

    public function setOperateur(string $operateur): static
    {
        $this->operateur = $operateur;

        return $this;
    }

    // public function getType(): ?string
    // {
    //     return $this->type;
    // }

    // public function setType(string $type): static
    // {
    //     $this->type = $type;

    //     return $this;
    // }

    public function getMin(): ?float
    {
        return $this->min;
    }

    public function setMin(float $min): static
    {
        $this->min = $min;

        return $this;
    }

    public function getMax(): ?float
    {
        return $this->max;
    }

    public function setMax(float $max): static
    {
        $this->max = $max;

        return $this;
    }

    public function getRetrait(): ?float
    {
        return $this->retrait;
    }

    public function setRetrait(float $retrait): static
    {
        $this->retrait = $retrait;

        return $this;
    }

    public function getDepot(): ?float
    {
        return $this->depot;
    }

    public function setDepot(float $depot): static
    {
        $this->depot = $depot;

        return $this;
    }
}
