import supabase from './supabase.js';
import { supabaseUrl } from './supabase.js';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}

export async function createCabin(newCabin) {
  const imagePath = await uploadImage(newCabin.image);

  const { data, error } = await supabase
    .from('cabins')
    // Since the newCabin object props has the same names as the table columns, we can just pass the object
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  return data;
}

async function uploadImage(image) {
  const random = Math.random().toString(36).substring(2, 9);
  const imageName = `${random}-${image.name}`.replaceAll('/', '');

  // Upload image
  const { error: uploadError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, image);

  if (uploadError) {
    console.error(uploadError);
    throw new Error('Image could not be uploaded');
  }

  return `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
}
