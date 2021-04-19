import dbConnect from '../../../utils/dbConnect';
import Playlist from '../../../models/Playlist';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const playlist = await Playlist.find({});

        res.status(201).json({ success: true, data: playlist });
      } catch (error) {
        res.json({ success: false })
      }
      break;

    case 'POST':
      try {
        const playlist = await Playlist.create(req.body);

        res.status(201).json({ success: true, data: playlist })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;

    case 'PUT':
      try {
        await Playlist.updateOne({ name: req.body.name }, { items: req.body.items });
        res.status(201).json({ success: true });

      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        await Playlist.deleteOne({ _id: req.body });
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }

}