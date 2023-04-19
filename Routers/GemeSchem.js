const express = require("express");
const router = express.Router();
const UserSchem = require("../Schems/GemeSchem");


const obj = {
  NewPlayers: (req, res) => {
    const { name1, ScoreGeme } = req.body;
    UserSchem.find({ name1: name1 }).then((response) => {
      if (response.length === 0) {
        const Account = new UserSchem({
          name1: name1,
          ScoreGeme: ScoreGeme,
          Turn:  false,
        });
        Account.save()
          .then(() => {
            res.status(200).json({ message: "Created !  " });
          })
          .catch((erorr) => {
            res.status(500).json({ erorr });
          });
      } else {
        res
          .status(209)
          .json({ message: "Conflit !  " + response[0].name1  + " Is exsist !" });
      }
    });
  },
  ChangePlayerScore: (req, res) => {
    const { name1, ScoreGeme, Turn } = req.body;
    UserSchem.findOneAndUpdate(
      { name1: name1,},
      { ScoreGeme: ScoreGeme,Turn:Turn},
      function (err, docs) {
        if (err) {
          res.status(401).json({ err });
        } else {
          res.status(200).json({ docs });
        }
      }
    );
  },
  GetPlayerSteps1: (req, res) => {
    UserSchem.find({}).then((response) => {
      return res.status(200).json({ GetIt: response[0].ScoreGeme});
    });
  },
  GetTurn1: (req, res) => {
    UserSchem.find({}).then((response) => {
      return res.status(200).json({ GetIt: response[0].Turn});
    });
  },
  GetPlayerSteps2: (req, res) => {
    UserSchem.find({}).then((response) => {
      return res.status(200).json({ GetIt: response[1].ScoreGeme});
    });
  },
  GetTurn2: (req, res) => {
    UserSchem.find({}).then((response) => {
      return res.status(200).json({ GetIt: response[1].Turn});
    });
  }
}


router.post("/NewPlayers", obj.NewPlayers);
router.post("/ChangePlayerScore", obj.ChangePlayerScore);
router.get("/GetPlayerSteps1", obj.GetPlayerSteps1);
router.get("/GetTurn1", obj.GetTurn1);
router.get("/GetPlayerSteps2", obj.GetPlayerSteps2);
router.get("/GetTurn2", obj.GetTurn2);
module.exports = router;
