/**
 * Tipi condivisi fra le schede prodotto.
 */

/**
 * Punto caldo su un disegno in sezione.
 *
 * `x` e `y` sono percentuali riferite al viewBox del disegno (1200 × 700):
 * restano valide se l'SVG viene sostituito mantenendo quel sistema di
 * coordinate.
 */
export type Hotspot = {
  id: string;
  x: number;
  y: number;
  titolo: string;
  /** Una riga: appare nel tooltip e come sommario nella lista mobile. */
  sommario: string;
  descrizione: string;
  /** Etichette dei dati da compilare. I valori restano segnaposto. */
  specs: string[];
};
