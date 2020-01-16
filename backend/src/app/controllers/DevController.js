import axios from 'axios';
import Dev from '../models/Dev';

import parseStringAsArray from '../../utils/parseStringAsArray';

class DevController {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    const userExist = await Dev.findOne({ github_username });

    if (userExist) {
      return res.status(400).json({ error: 'User alredy exists.' });
    }

    const response = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { name = login, avatar_url, bio } = response.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    });

    return res.json(dev);
  }

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  }
}

export default new DevController();
