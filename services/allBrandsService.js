// /services/allBrandService.js
export const fetchBrands = async () => {
    try {
    {/*The key should be added to env but for this demo project I kept it here only*/}
      const res = await fetch("https://68a0f3e46f8c17b8f5d8dd7c.mockapi.io/api/brands");
      if (!res.ok) throw new Error("Failed to fetch brands");
      return res.json();
    } catch (err) {
      console.error("All Brand Service Error:", err);
      throw err;
    }
  };
  