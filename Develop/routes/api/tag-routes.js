const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try{
    const tags=await Tag.findAll({
      include:[Product],
    });
 
      res.json(tags);
  }catch (error) {
    res.status(500),json({error: "Couldn't find tags"});
  }
});
// find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try{
    const tag = await Tag.findByPk(req.params.id,{
      include: [Product],
  });

  if(!tag) {
    return res.status(404).json({error: "Couldn't find tag"});
  }  
  res.json(tag);
} catch (error) {
  res.status(500).json({error: "Couldn't get tag"});
}

});

router.post('/', async (req, res) => {
  try{
    const {name} = req.body;
    const newTag = await Tag.create({name});

    res.status(201), json(newTag);
  } catch (error){
    res.status(500).json({error: "Couldn't create a new tag"});
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  const tagId = req.params.id;
  const {name}=req.body;

  try{
    const updatedTag =await Tag.update(
      {name},
      {
        where: {id: tagId},
      }
    );
    if (updatedTag[0]===0){
      return res.status(404).json({error: "Couldn't find tag"});
    }
    }catch (error){
      res.status(500).json({error: "Couldn't update tag"});
    }
  });
  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  const tagId = req.params.id;
  const {name} = req.body;

  try {
    const deletedTagCount = Tag.destroy({
      where:{id: tagId},
    });
    

    if(deletedTagCount===0){
      return res.status(404).json({ error: "Couldn't find tag"});
    }

    res.status (200).json({message: "Tag deleted"});
  }catch (error) {
    res.status(500).json({error: "Couldn't delete tag"});
  }
});


module.exports = router;
