<?php

namespace Pos\Auth\Domain\Entity;

use Illuminate\Http\Request;
use Pos\Auth\Domain\Exception\InvalidArgumentException;
use Pos\Auth\Domain\ValueObject\Date;
use Pos\Auth\Domain\ValueObject\Phone;
use Pos\Auth\Domain\ValueObject\UserDni;
use Pos\Auth\Domain\ValueObject\UserEmail;
use Pos\Auth\Domain\ValueObject\UserName;

class User
{
    private UserDni $id;
    private UserEmail $email;
    private UserName $name;
    private Date $birthDate;
    private Phone $phone;

    public function __construct(
        UserDni $id,
        UserEmail $email,
        UserName $name,
        Phone $phone,
        Date $birthDate
    ) {
        $this->id = $id;
        $this->email = $email;
        $this->name = $name;
        $this->phone = $phone;
        $this->birthDate = $birthDate;
    }

    /**
     * @throws InvalidArgumentException
     */
    public static function fromRequest(Request $request): self
    {
        return new self(
            new UserDni($request->input('dni')),
            new UserEmail($request->input('email')),
            new UserName($request->input('name')),
            new Phone($request->input('phone')),
            new Date($request->input('birth_date'))
        );
    }

    public function toArray(): array
    {
        return [
            'dni' => $this->id->toString(),
            'email' => $this->email->toString(),
            'name' => $this->name->toString(),
            'birth_date' => $this->birthDate->format('Y-m-d'),
            'phone' => $this->phone->toString(),
        ];
    }

    public function getId(): UserDni
    {
        return $this->id;
    }

    public function setId(UserDni $id): void
    {
        $this->id = $id;
    }

    public function getEmail(): UserEmail
    {
        return $this->email;
    }

    public function setEmail(UserEmail $email): void
    {
        $this->email = $email;
    }

    public function getName(): UserName
    {
        return $this->name;
    }

    public function setName(UserName $name): void
    {
        $this->name = $name;
    }

    public function getBirthDate(): Date
    {
        return $this->birthDate;
    }

    public function setBirthDate(Date $birthDate): void
    {
        $this->birthDate = $birthDate;
    }

    public function getPhone(): Phone
    {
        return $this->phone;
    }

    public function setPhone(Phone $phone): void
    {
        $this->phone = $phone;
    }





}
