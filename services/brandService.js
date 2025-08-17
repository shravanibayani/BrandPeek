export const fetchBrandById = async (brandId) => {
    try {
        {/*The key should be added to env but for this demo project I kept it here only*/}
      const res = await fetch(`https://68a0f3e46f8c17b8f5d8dd7c.mockapi.io/api/brands/${brandId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch brand");
      }
      return res.json();
    } catch (err) {
      console.error("Brand Service Error:", err);
      throw err;
    }
  };
  