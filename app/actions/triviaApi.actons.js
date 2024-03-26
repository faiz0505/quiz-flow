"use server";
export const fetchCategories = async () => {
  try {
    const fetchCategories = await fetch("https://opentdb.com/api_category.php");
    const category = await fetchCategories.json();

    return JSON.parse(JSON.stringify(category));
  } catch (error) {
    return null;
  }
};
