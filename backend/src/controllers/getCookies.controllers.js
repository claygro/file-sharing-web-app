class GetCookies {
  async getCookies(req, res) {
    const token = req.user;
    try {
      if (!token) {
        return res
          .status(401)
          .json({ message: "You are unauthorized. Pleased loggedin" });
      }
      res.status(200).json(token);
    } catch (error) {
      console.log(`Error in getting cookies ${error}`);
    }
  }
}
export default GetCookies;
