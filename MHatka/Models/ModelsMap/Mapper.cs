using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MHatka.Models.ModelsMap
{
    public class Mapper
    {
        public ModelGlobalGroup MapGlobalGroup(GlobalGroup globalGroup)
        {
            ModelGlobalGroup mgg = new ModelGlobalGroup();
            mgg.Id = globalGroup.Id;
            mgg.Name = globalGroup.Name;
            List<MapGroup> mapGroups = new List<MapGroup>();
            globalGroup.Groups.ToList().ForEach(h => mapGroups.Add(MappingGroups(h)));
            mgg.Groups = mapGroups;
            return mgg;
        }
        public MapGroup MappingGroups(Group group)
        {
            MapGroup mapGroup = new MapGroup();
            mapGroup.Id = group.Id;
            mapGroup.Name = group.Name;
            return mapGroup;
        }
        public MapProduct MappingProduct(Product product)
        {
            MapProduct mapProduct = new MapProduct();
            mapProduct.Id = product.Id;
            mapProduct.Name = product.Name;
            mapProduct.Article = product.Article;
            mapProduct.Description = product.Description;
            mapProduct.Images = product.Images.Select(q=>q.Name).ToList();
            mapProduct.Brend = product.Brend.Name;
            mapProduct.Country = product.Country.Name;
            mapProduct.Filler = product.Filler.Name;
            mapProduct.Group = product.Group.Name;
            mapProduct.Material = product.Material.Name;
            List<MapSizeer> mapSizeers = new List<MapSizeer>();
            foreach (var item in product.Sizeers.ToList())
            {
                if(item.InStock == true)
                {
                    mapSizeers.Add(MappingSizeer(item));
                }
            }

            //product.Sizeers.ToList().ForEach(q => mapSizeers.Add(MappingSizeer(q)));
            mapProduct.MapSizeers = mapSizeers;
            mapProduct.Special = product.Special.Name;
            mapProduct.TypeCloth = product.TypeCloth.Name;
            return mapProduct;
        }
        public MapSizeer MappingSizeer(Sizeer sizeer)
        {
            MapSizeer mapSizeer = new MapSizeer();
            mapSizeer.Id = sizeer.Id;
            mapSizeer.Prices = sizeer.Prices.Content;
            mapSizeer.Sizes = sizeer.Sizes.Name;
             return mapSizeer;
        }
    }
}