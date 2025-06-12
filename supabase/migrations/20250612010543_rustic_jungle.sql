/*
  # Create recipe_favorites table

  1. New Tables
    - `recipe_favorites`
      - `id` (uuid, primary key)
      - `recipe_id` (uuid, foreign key to recipes)
      - `user_id` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `recipe_favorites` table
    - Add policies for authenticated users to manage their favorites
*/

CREATE TABLE IF NOT EXISTS recipe_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create a unique constraint to prevent duplicate favorites
CREATE UNIQUE INDEX recipe_favorites_recipe_id_user_id_key ON recipe_favorites (recipe_id, user_id);

-- Create index for faster lookups
CREATE INDEX idx_recipe_favorites_user_id ON recipe_favorites (user_id);
CREATE INDEX idx_recipe_favorites_recipe_id ON recipe_favorites (recipe_id);

-- Enable Row Level Security
ALTER TABLE recipe_favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own favorites"
  ON recipe_favorites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON recipe_favorites
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own favorites"
  ON recipe_favorites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);