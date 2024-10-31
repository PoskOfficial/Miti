async function fetchGoldSilverRates() {
  const url = 'https://www.fenegosida.org/rate-history.php';

  try {
    // Fetch the page content
    const response = await fetch(url);
    const htmlText = await response.text();

    // Parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // Extract rate date
    const day = doc.querySelector('.rate-date-day')?.textContent?.trim();
    const month = doc.querySelector('.rate-date-month')?.textContent?.trim();
    const year = doc.querySelector('.rate-date-year')?.textContent?.trim();
    const rateDate = `${day} ${month} ${year}`;

    // Extract rates per 10 gm
    const fineGoldPer10gm =
      doc.querySelector('.rate-gold b')?.textContent?.trim() || '0';
    const tejabiGoldPer10gm =
      doc.querySelectorAll('.rate-gold b')[1]?.textContent?.trim() || '0';
    const silverPer10gm =
      doc.querySelector('.rate-silver b')?.textContent?.trim() || '0';

    // Extract rates per 1 tola
    const fineGoldPerTola =
      doc.querySelectorAll('.rate-gold b')[2]?.textContent?.trim() || '0';
    const tejabiGoldPerTola =
      doc.querySelectorAll('.rate-gold b')[3]?.textContent?.trim() || '0';
    const silverPerTola =
      doc.querySelectorAll('.rate-silver b')[1]?.textContent?.trim() || '0';
    console.log(
      fineGoldPer10gm,
      tejabiGoldPer10gm,
      silverPer10gm,
      fineGoldPerTola,
      tejabiGoldPerTola,
      silverPerTola,
    );
    // Return the data
    return {
      rateDate,
      rates: {
        fineGold: {
          per10gm: fineGoldPer10gm,
          perTola: fineGoldPerTola,
        },
        tejabiGold: {
          per10gm: tejabiGoldPer10gm,
          perTola: tejabiGoldPerTola,
        },
        silver: {
          per10gm: silverPer10gm,
          perTola: silverPerTola,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching or parsing rates:', error);
    return null;
  }
}
export default fetchGoldSilverRates;
