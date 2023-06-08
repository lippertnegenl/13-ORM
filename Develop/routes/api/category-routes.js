const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  try{
  const categories = await Category.findAll({
    include:[Product],
  });

  res.json(categories);
}catch(error){
  res.status(500).json({error:"failed to get categories"});
}
});

router.get('/:id',async (req, res) => {
  try{
    const categories = await Category.findByPk(Category, {
      include:[Product],
    });
  
    res.json(categories);
  }catch(error){
    res.status(500).json({error:"failed to get categories"})
 
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const {name} = req.body;
    const newCategory = await Category.create({name});

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({error: "Failed to create a category"});
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  const CategoryId = req.params.id;
  const {name} = req.body;

  try {
    const updatedCategory = await Category.update(
      {name},
      {
        where: {id:CategoryId},
      }
    );
    
    if (updatedCategory[0]===0){
      return res.status(404).json({error: "Category not found"})
    }
    res.status(200).json({message: "Category updated successfully"});
  } catch (error){
    res.status(500).json({error: "Failed to update category"});
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategoryCount = await Category.destroy({
      where: { id: categoryId},
    });

    if (deletedCategoryCount===0) {
      return res.status(404).json({error: "Category not found"});
    } 
      res.status(500).json({error: "Failed to delete category"});
    } catch (error) {
      res.status(500).json({error: "Failed to delete category"});
    }
    });
  // delete a category by its `id` value


module.exports = router;

