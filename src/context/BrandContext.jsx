import { createContext, useState } from "react";

export const BrandContext = createContext();
export function BrandProvider({ children }) {
  const [brands, setBrands] = useState([
    { id: 1, title: "شون", enTitle: "Schon" },
    { id: 2, title: "لافارر", enTitle: "La Farrerr" },
    { id: 3, title: "ویتالیر", enTitle: "Vitalayer" },
    { id: 4, title: "مای", enTitle: "My" },
    { id: 5, title: "سی گل", enTitle: "Seagull" },
    { id: 6, title: "آردن", enTitle: "Ardene" },
    { id: 7, title: "هیدرودرم", enTitle: "Hydroderm" },
    { id: 8, title: "درماتیپیک", enTitle: "Dermatypique" },
    { id: 9, title: "ژوت", enTitle: "Jute" },
    { id: 10, title: "پرودرما", enTitle: "Proderma" },
    { id: 11, title: "نئودرم", enTitle: "Neuderm" },
    { id: 12, title: "اکتیو", enTitle: "Active" },
    { id: 13, title: "بایودرما", enTitle: "Bioderma" },
    { id: 14, title: "اون", enTitle: "Avène" },
    { id: 15, title: "لاروش پوزای", enTitle: "La Roche Posay" },
    { id: 16, title: "گارنیر", enTitle: "Garnier" },
    { id: 17, title: "لورآل", enTitle: "L'Oréal" },
    { id: 18, title: "نیوآ", enTitle: "Nivea" },
    { id: 19, title: "نوتروژینا", enTitle: "Neutrogena" },
    { id: 20, title: "کلینیک", enTitle: "Clinique" },
    { id: 21, title: "داو", enTitle: "Dove" },
    { id: 22, title: "پنتن", enTitle: "Pantene" },
    { id: 23, title: "هد اند شولدرز", enTitle: "Head & Shoulders" },
    { id: 24, title: "اوریاژ", enTitle: "Uriage" },
    { id: 25, title: "سینره", enTitle: "Cinere" },
    { id: 26, title: "کامان", enTitle: "Comeon" },
    { id: 27, title: "لافارم", enTitle: "Lafarm" },
    { id: 28, title: "درمالیفت", enTitle: "Dermalift" },
    { id: 29, title: "فرش فیل", enTitle: "Fresh Feel" },
    { id: 30, title: "هیمالیا", enTitle: "Himalaya" },
  ]);
  return (
    <BrandContext.Provider value={{ brands, setBrands }}>
      {children}
    </BrandContext.Provider>
  );
}
