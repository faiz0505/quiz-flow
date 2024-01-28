export const fetchQuizes = async (category, difficulty) => {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`,
      {
        next: { revalidate: 3600 },
      }
    );
    const quizes = await res.json();
    console.log(quizes);
    return quizes;
  } catch (error) {
    console.log(error);
  }
};
