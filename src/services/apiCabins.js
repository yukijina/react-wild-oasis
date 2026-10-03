import supabase from './supabase';
import { supabaseUrl } from './supabase';

// fetch all cabins
export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  // console.log(data);
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be loaded');
  }

  return data;
}

// create single cabin
export async function createEditCabin(newCabin, id) {
  console.log(newCabin);
  // image path is differnt from edit (url if new image was not uploaded) and create(file upload)
  // without optional chaining, code might break because it is not text
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // Create radonm number but we don't want any / so replacing with blank
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  // console.log(imageName);
  //https://ewytfapmerrnrlhrlibk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // Edit & No new image: use the existing url.
  //Edit (new image) or Create:  generate image path and upload new url
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  // insert function does not immediately return row. If we need a newly created data, we need to add select().single()
  let query = supabase.from('cabins');
  // a) Create a cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // b) Edit a cabin update does not use array
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  console.log(newCabin);
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  //2. Upload image to the bucket
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //3. De;ete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }
  return data;
}

// delete a single cabin
export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
