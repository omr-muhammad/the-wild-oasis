import { ADMIN_USER_ID } from '../utils/constants.js';
import supabase, { supabaseUrl } from './supabase.js';

export async function signUp({ fullName, email, password, isAdmin }) {
  if (!isAdmin) throw new Error('Only admins can do this action');

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: '' },
    },
  });

  if (error) throw new Error(error.message);
}

export async function login(user) {
  const { data, error } = await supabase.auth.signInWithPassword(user);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateUserData({ password, fullName, avatar, userId }) {
  if (userId !== ADMIN_USER_ID)
    throw new Error('Only admins can do this action');

  const avatarPath = avatar ? await uploadAvatar(avatar, userId) : null;

  let updateData;

  if (password) updateData = { password };
  else updateData = { data: { fullName, avatar: avatarPath || '' } };

  const { error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
}

async function uploadAvatar(avatar, userId) {
  const random = Math.random().toString(36).substring(2, 9);
  const imageName = `${userId}-${random}-${avatar.name}`.replaceAll('/', '');

  // Upload image
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(imageName, avatar);

  if (uploadError) {
    console.error(uploadError);
    throw new Error('Image could not be uploaded');
  }

  return `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;
}
