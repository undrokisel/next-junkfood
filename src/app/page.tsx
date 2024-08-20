import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Header } from '../components/shared/header';

export default function Home() {
  return (
  <>
    <h1>Home</h1>
    <Button
    size="lg"
    variant="outline"
    >Купить</Button>
  </>
  );
}
