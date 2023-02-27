/// <reference types="vite/client" />

interface Card {
  id: number;
  name: string;
  company: string;
  image: string;
  type: string;
  benefit?: string;
}

interface CardInfo {
  benefit: string[];
  company: string;
  id: number;
  image: string;
  name: string;
  type: string;
  annualFee: number;
  apply: string;
  lastMonthPaid: number;
}

interface getReview {
  id: number;
  message: string[] | undefined;
}

interface State {
  id: number;
  message: string[];
  status: "idle" | "loading" | "failed";
}

interface Argument {
  id: number;
  selectedReview: string[];
}
interface selectedReview {
  message: string;
}

interface BenefitProps {
  item: string;
}

interface SignType {
  userId: string;
  password: string;
  name: string;
  benefit: Array<string>;
}

interface LoginType {
  userId: string;
  password: string;
}

interface Button {
  color: string;
  background: string;
}

interface width {
  width: number;
  height: number;
}
interface Size {
  size: number;
}

interface CardType {
  company: string;
  id: number;
  image: string;
  name: string;
  type: string;
  imageUrl: string;
}
