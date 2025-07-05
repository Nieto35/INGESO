<?php

    namespace Pos\Auth\Domain\ValueObject;

    use DateTimeImmutable;
    use Exception;
    use Pos\Auth\Domain\Exception\InvalidArgumentException;

    class Date
    {
        private DateTimeImmutable $date;

        /**
         * @throws InvalidArgumentException
         */
        public function __construct(string $date)
        {
            try {
                $this->date = new DateTimeImmutable($date);
            } catch (Exception $e) {
                throw new InvalidArgumentException("La fecha proporcionada no es válida: $date");
            }
        }

        public function toDate(): DateTimeImmutable
        {
            return $this->date;
        }

        public function format(string $format): string
        {
            return $this->date->format($format);
        }
    }
