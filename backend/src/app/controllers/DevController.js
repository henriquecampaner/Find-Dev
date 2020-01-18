import axios from 'axios';
import Dev from '../models/Dev';

import parseStringAsArray from '../../utils/parseStringAsArray';

const { findConnections, sendMessage } = require('../../websocket');

class DevController {
  async store(req, res) {
    const { github_username, techs, longitude, latitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      // eslint-disable-next-line no-undef
      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techs
      );
      sendMessage(sendSocketMessageTo, 'new-dev', dev);

      return res.json(dev);
    }
    return res.status(400).json({ error: 'User alredy exists.' });
  }

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  }
}

export default new DevController();
