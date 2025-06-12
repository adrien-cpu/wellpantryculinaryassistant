/*
  # Recipe Favorites Table

  1. New Tables
    - `recipe_favorites`
      - `id` (uuid, primary key)
      - `recipe_id` (uuid, not null)
      - `user_id` (uuid, not null, references auth.users)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `recipe_favorites` table
    - Add policies for authenticated users to manage their favorites
*/

-- Create recipe_favorites table if it doesn't exist
CREATE TABLE IF NOT EXISTS recipe_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Add foreign key to recipes table if it exists and the constraint doesn't exist yet
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'recipes') AND 
     NOT EXISTS (SELECT FROM information_schema.table_constraints WHERE constraint_name = 'recipe_favorites_recipe_id_fkey') THEN
    ALTER TABLE recipe_favorites 
    ADD CONSTRAINT recipe_favorites_recipe_id_fkey 
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add unique constraint to prevent duplicate favorites if it doesn't exist yet
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.table_constraints WHERE constraint_name = 'recipe_favorites_recipe_id_user_id_key') THEN
    ALTER TABLE recipe_favorites 
    ADD CONSTRAINT recipe_favorites_recipe_id_user_id_key 
    UNIQUE (recipe_id, user_id);
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE recipe_favorites ENABLE ROW LEVEL SECURITY;

-- Create policies (dropping first if they exist)
DO $$
BEGIN
  -- Drop policies if they exist
  IF EXISTS (SELECT FROM pg_policies WHERE tablename = 'recipe_favorites' AND policyname = 'Users can view their own favorites') THEN
    DROP POLICY "Users can view their own favorites" ON recipe_favorites;
  END IF;
  
  IF EXISTS (SELECT FROM pg_policies WHERE tablename = 'recipe_favorites' AND policyname = 'Users can add their own favorites') THEN
    DROP POLICY "Users can add their own favorites" ON recipe_favorites;
  END IF;
  
  IF EXISTS (SELECT FROM pg_policies WHERE tablename = 'recipe_favorites' AND policyname = 'Users can delete their own favorites') THEN
    DROP POLICY "Users can delete their own favorites" ON recipe_favorites;
  END IF;
END $$;

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

-- Create indexes for performance if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_recipe_favorites_user_id') THEN
    CREATE INDEX idx_recipe_favorites_user_id ON recipe_favorites(user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_recipe_favorites_recipe_id') THEN
    CREATE INDEX idx_recipe_favorites_recipe_id ON recipe_favorites(recipe_id);
  END IF;
END $$;