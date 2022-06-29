const blogRouter = require('express').Router();
const blog = require('../Model/blogSchema');



////////// CREATE A BLOG///////////////////
blogRouter.post('/', (req, res) => {
    const blogData = req.body
    ////  title: req.body.title,
       /// content: req.body.content,///
    blog.create(blogData, (error, createdBlog) => {
  
      if (error) {
        console.error(error)
        res.status(400).json({
          error: 'an error has occurred creating the blog'
        })
      } else {
        //console.log('created blog successfully');
        res.status(201).json({
          message: 'Created Successfully',
          blog: createdBlog
        })
      }
    })
  })


  ////////////////////TO FIND ALL BLOGS///////////////

  blogRouter.get("/:search", (req, res) => {

    blog.find({"title" : {$regex : req.params.search}}//to find with key words///
   
    , (error, searchedBlogs) => {
console.log(searchedBlogs)
      if (error) {
        console.error(error);
        res.json({
          error: 'an error has occurred'
        });
      } else {
        console.log('success!')
        res.json({
          message: 'Success!',
          blogs: searchedBlogs
        });
      }
    });
  });
  ////////////////////////////////////////////////////////////

//UPDATE OPERATION
// blogRouter.put(
// "/:id",
// (req, res, next) => {
//     const post = new blog({
//         _id: req.body.id,
//         title: req.body.title,
//         content: req.body.content,
     
//     });
//     blog.updateOne(
//         { _id: req.params.id},
//         post
//       ).then(result => {
//         if(result){
//             res.status(200).json({ message: "Update successful!" });
//         }       
//         else {
//             res.status(500).json({ message: "Error Upating Post" });
//         }
//     });
// }
// );

blogRouter.put("/:id", (req, res)=>{
  const id = req.params.id
  const updatedBlog = req.body

  blog.updateOne({_id:id}, updatedBlog, {new: true},(err, updatedBlog)=>{
      if(err){
          console.error(error)
          res.status(404).json({message: err.message})
      } else {
          res.status(202).json(updatedBlog)
      }
  })
})






//DELETE OPERATION

module.exports = blogRouter;
