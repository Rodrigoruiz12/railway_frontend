// src/utils/formatPrice.js

// Da formato de peso chileno a un número, sin decimales.
export function money(x) {
  return Intl.NumberFormat("es-CL", { 
    style: "currency", 
    currency: "CLP",
    minimumFractionDigits: 0
  }).format(x);
}