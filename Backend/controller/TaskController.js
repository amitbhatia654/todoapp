const AddTask = (req, res) => {
  try {
    console.log(req.body, "body");
    res.status(200).send("Data added Successfully");
  } catch (error) {
    res.send("something went wrong in add task ");
  }
};

module.exports = { AddTask };
