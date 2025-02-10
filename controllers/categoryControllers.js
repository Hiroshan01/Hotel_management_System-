import Category from "../models/category.js";


 export function isAdminValid(req) {
    if (!req.user) {
      return false;
    }
    if (req.user.type != "admin") {
      return false;
    }
    return true; // if admin
  }

export function createCategory(req,res){
    if(req.user==null){
        res.status(401).json({
            message:"Unauthorized"
        })
        return;
    }
    if(req.user.type !="admin"){
        res.status(401).json({
            message:"Not Permissions"
        })
        return;
    }
    const newCategory=new Category(req.body)
    newCategory.save().then(
        (result)=>{
            res.json({
                message:"Category created sucessfully",
                result:result
            })
        }
    ).catch(
        (err)=>{
            res.status(500).json(
                {
                    message:"Category creation failed"
                }
            )
        }
    )

}
//delete category

export function deleteCatagory(req,res){
    if(!req.user){
        res.status(403).json({
            message:"Unauthorized"
        })
        return
    }
    if (req.user.type !== "admin") {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    const name=req.params.name;
    Category.findOneAndDelete({name:name}).then(
        ()=>{
            res.json({
                message:"Category deleted sucessfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Cannot delete categories!"
            })
        }
    )
}

//get category

export function getCategory(req,res){

   Category.find().then(
    (result)=>{
        res.json(
            {
                categories:result
            }
        )
    }
   ).catch(
    ()=>{
        res.json(
            {
                message:"Faild to get acategory"
            }
        )
    }
   )
}
//get categoryby name

export function getCategoryByName(req,res){
     const name=req.params.name;
     Category.findOne({name:name}).then(
        (result)=>{
           if(result == null){
             res.json({
                message:"Category not found"
             })
           }else{
            res.json({
                category:result
            })
           }
        }
     ).catch(
        ()=>{
            res.status(500).json({
                message:"Failed to get category"
            })
        }
     )
}

//update category
export function updateCategory(req, res) {
    if (!isAdminValid(req)) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }
  
    const name = req.params.name;
    Category.updateOne({ name: name }, req.body)
      .then(() => {
        res.json({
          message: "Category updated successfully"
        });
      })
      .catch(() => {
        res.json({
          message: "Failed to update category"
        });
      });
  }

  //delete rooms

