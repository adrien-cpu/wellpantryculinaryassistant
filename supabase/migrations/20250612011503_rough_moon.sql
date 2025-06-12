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
    - Add policies for users to manage their own favorites
*/

CREATE TABLE IF NOT EXISTS recipe_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Add foreign key to recipes table if it exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'recipes') THEN
    ALTER TABLE recipe_favorites 
    ADD CONSTRAINT recipe_favorites_recipe_id_fkey 
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add unique constraint to prevent duplicate favorites
ALTER TABLE recipe_favorites 
ADD CONSTRAINT recipe_favorites_recipe_id_user_id_key 
UNIQUE (recipe_id, user_id);

-- Enable Row Level Security
ALTER TABLE recipe_favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own favorites" 
  ON recipe_favorites 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorites" 
  ON recipe_favorites 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" 
  ON recipe_favorites 
  FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_recipe_favorites_user_id ON recipe_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_recipe_favorites_recipe_id ON recipe_favorites(recipe_id);