
const rawData = `
Agente de location :          Molka Nouri 
Courriel :              Nouri.m@ohoutaouais.ca  
Téléphone :              819 568-0033, poste 550 
 
Adresses (numéros de rue) :  
• Du Conservatoire (55, 59, 63, 67, 71, 75, 79, 83, 87, 91, 95, 99, 103, 107)  
• Liverpool (151, 155, 159, 163, 167, 171, 175, 179, 183, 187, 191, 195, 199, 203, 207) 
• Mance (20) 
• Sacré-Cœur (40, 50) 
 
Agente de location :         Madame Karine Bertrand 
Courriel :              Bertrand.k@ohoutaouais.ca 
Téléphone :              819 568-0033, poste 535 
 
Adresses (numéros de rue) :  
• Arthur-Buies (24, 26, 28)  
• Broad (135, 145, 155, 165) 
• Des Étudiants (15, 20, 30) 
• Deschênes (34) 
• Étienne-Brûlé (5) 
• Georges-Bilodeau (26) 
• Jumonville (73, 75) 
• Le Breton (6, 7, 8, 9, 27) 
• Lesage (75) 
• Mutchmore/Lesage (projet) 
• Mont-Bleu (155, 165, 175) 
• North (285, 287, 289, 291, 293)  
• Pearson (89) 
• Robert-Wright (20, 30, 40) 
• Wilfrid-Lavigne (433, 435, 437, 345) 

Agente de location :         Madame Mélanie Lafontaine 
Courriel :             Lafontaine.m@ohoutaouais.ca 
Téléphone :              819 568-0033, poste 538  
 
Adresses (numéros de rue) :  
• Beausoleil (96)  
• Claire (20, 26) 
• De la Baie (70, 75, 115)  
• De l’Hôpital (375, 383)  
• Des Fondateurs (10)  
• Des Sables (104, 114) 
• Du Carrefour (807) 
• Du Manoir (3) 
• Dupuis (40, 44, 48) 
• Fortin (60) 
• F.X.-Bouvier (46, 56, 66) 
• Gréber (452) 
 
• Guertin (25) 
• Hôtel-de-Ville (280) 
• Jeannine-Grégoire-Ross (131, 135, 147, 151, 155, 167, 171, 183, 187) 
• Kemp (27) 
• Lamarche (210) 
• La Savane (137, 225, 227, 235, 245) 
• Lausanne (160) 
• Laval (170) 
• Maloney Est (1298, 1300, 1302, 1304) 
• Marengère (73, 75, 77, 81, 85) 
• Mont-Royal (680, 690) 
• Nilphas-Richer (18, 24, 30, 36, 42) 
• Notre-Dame (1236, 1238, 1240) 
• Péribonka (7, 25) 
• Petite-Nation (94) 
• Place Bellevue (103) 
• Raphaël (40) 
• Rodolphe-Pelletier (180 à 210) 
• Saint-Henri (230)  
• Saint-René Ouest (898, 902, 906) 
• Sully (37) 
• Transcanadienne (1346)  
• Williams (610, 614) 

Agente de location :         Madame Brigitte Morrissette Beauchamp 
Courriel :             MorrissetteBeauchamp.b@ohoutaouais.ca 
Téléphone :              819 568-0033, poste 514  
 
Adresses (numéros de rue) :  
• Church (195) 
• Du Progrès (225, 455) 
• Gouin (463, 471, 479, 489) 
• Graveline (478, 488) 
• La Vérendrye (365) 
  
• Jean-Louis-Champagne (100, 110, 120) 
• Maclaren (830, 832, 834, 836) 
• Notre-Dame (240) 
• O’Farrell (38, 42, 51, 55, 59) 
• P.-Labine (193, 197, 201, 205) 
• Saint-Denis (94) 
• Saint-Pierre (23) 
• Saint-René Est (295-301) 
• Victor-Lacelle (15) 

Agente de location :        Madame Amélie Madore 
Courriel :             Madore.a@ohoutaouais.ca 
Téléphone :             819 568-0033, poste 549 
 
Adresses (numéros de rue) :  
• Bégin (31, 33) 
• Champlain (344) 
• Duhamel (14, 16) 
• Eddy (95) 
• Edgar-Chénier (12, 14, 16) 
• Hanson (81-83) 
• Hanson (maisonnettes) 
• Hélène-Duval (35, 49) 
• Jean-Dallaire (projet) 
• Kent (123) 
• Lambert (maisonnettes) 
• Hanson (54) 
• Leduc (152) 
• Lévesque (2, 4) 
• Mance (maisonnettes) 
• Morin (16) 
• Prévost (27, 29) 
• Sainte-Bernadette (10) 
• Viger (18) 
• Vaudreuil (40) 
• Wright (35)
`;

const locataires = [];

const blocs = rawData.split("Agente de location :").slice(1);

blocs.forEach(bloc => {
  const lignes = bloc
    .split("\n")
    .map(l => l.trim())
    .filter(l => l);

  let agent = "";
  let email = "";
  let tel = "";

  lignes.forEach((ligne) => {

    if (!agent &&
        !ligne.toLowerCase().includes("courriel") &&
        !ligne.toLowerCase().includes("téléphone") &&
        !ligne.toLowerCase().includes("adresses") &&
        !ligne.startsWith("•")
    ) {
      agent = ligne.replace("Madame", "").trim();
    }

    if (ligne.toLowerCase().includes("courriel")) {
      email = ligne.split(":")[1]?.trim() || "";
    }

    if (ligne.toLowerCase().includes("téléphone")) {
      tel = ligne.split(":")[1]?.trim() || "";
    }

    if (ligne.startsWith("•")) {
      const rue = ligne.replace("•", "").trim();

      locataires.push({
        rue,
        agent,
        tel,
        email
      });
    }
  });
});
function getCodeSIGLS(agent) {
  switch (agent) {
    case "Molka Nouri":
      return "molnou4";

    case "Karine Bertrand":
      return "karber19";

    case "Mélanie Lafontaine":
      return "mellaf";

    case "Brigitte Morrissette Beauchamp":
      return "brigmor29";

    case "Amélie Madore":
      return "amemad";

    default:
      return "";
  }
}
const showCode = new URLSearchParams(window.location.search).get("code") === "1";
