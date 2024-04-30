import supabase from './supabase.js';

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
  const { data, error } = await supabase
    .from('cabins')
    // Since the newCabin object props has the same names as the table columns, we can just pass the object
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  return data;
}
