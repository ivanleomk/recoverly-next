export const getCategories = `
query getCategories {
    category(where: {parent_id: {_is_null: true}}) {
      category_id
      category_name
      image_url
    }
  }  
`;
