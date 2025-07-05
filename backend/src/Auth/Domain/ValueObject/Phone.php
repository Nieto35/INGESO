<?php

namespace Pos\Auth\Domain\ValueObject;

use Pos\Auth\Domain\Exception\InvalidArgumentException;

class Phone
{

    private string $phone;

    /**
     * @throws InvalidArgumentException
     */
    public function __construct(string $phone)
    {
        if (strlen($phone) !== 9) {
            throw new InvalidArgumentException("El telefono proporcionado debe tener exactamente 9 caracteres: $phone");
        }

        $this->phone = $phone;
    }

    public function toString(): string
    {
        return $this->phone;
    }
}
