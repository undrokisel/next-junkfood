import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Header } from '../components/shared/header';
import { Title } from '../components/shared/title';
import { Container } from '../components/shared/container';

export default function Home() {
  return (
  <>
    <Container className="mt-10">
      <Title size="lg" text="Весь ассортимент" />
    </Container>
  </>
  );
}
