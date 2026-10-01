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
export async function createCabin(newCabin) {
  // Create radonm number but we don't want any / so replacing with blank
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  console.log(imageName);
  //https://ewytfapmerrnrlhrlibk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create a cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }]);

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
