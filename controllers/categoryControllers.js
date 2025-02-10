import Category from "../models/category.js";

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