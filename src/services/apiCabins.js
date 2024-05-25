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

export async function deleteCabin(id, image, isAdmin) {
  if (!isAdmin) throw new Error('Only admins can do this action');

  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  // Remove image from storage
  const imageName = image.split('/').pop();
  const { error: imageError } = await supabase.storage
    .from('cabin-images')
    .remove([imageName]);

  if (imageError) console.log(imageError);

  return data;
}

export async function createEditCabin(newCabin, id) {
  const imagePath = newCabin?.image?.startsWith?.(supabaseUrl)
    ? newCabin.image
    : await uploadImage(newCabin.image);

  const cabin = { ...newCabin, image: imagePath };

  let query = supabase.from('cabins');

  // A) CREATE
  if (!id) query = query.insert([cabin]);

  // B) UPDATE
  if (id) query = query.update(cabin).eq('id', id);

  const { data, error } = await query.select().single();

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
