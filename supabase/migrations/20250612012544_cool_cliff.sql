/*
  # Create recipe favorites table

  1. New Tables
    - `recipe_favorites`
      - `id` (uuid, primary key)
      - `recipe_id` (uuid, not null)
      - `user_id` (uuid, not null, references auth.users)
      - `created_at` (timestamp with time zone)
  2. Security
    - Enable RLS on `recipe_favorites` table
    - Add policies for users to manage their own favorites
*/

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS recipe_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Add foreign key to recipes table if it exists and the constraint doesn't exist
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'recipes') AND 
     NOT EXISTS (SELECT FROM information_schema.constraint_column_usage WHERE constraint_name = 'recipe_favorites_recipe_id_fkey') THEN
    ALTER TABLE recipe_favorites 
    ADD CONSTRAINT recipe_favorites_recipe_id_fkey 
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add unique constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.constraint_column_usage WHERE constraint_name = 'recipe_favorites_recipe_id_user_id_key') THEN
    ALTER TABLE recipe_favorites 
    ADD CONSTRAINT recipe_favorites_recipe_id_user_id_key 
    UNIQUE (recipe_id, user_id);
  END IF;
END $$;

-- Enable Row Level Security if not already enabled
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'recipe_favorites' AND rowsecurity = true) THEN
    ALTER TABLE recipe_favorites ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'recipe_favorites' AND policyname = 'Users can view their own favorites') THEN
    CREATE POLICY "Users can view their own favorites" 
      ON recipe_favorites 
      FOR SELECT 
      TO authenticated 
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'recipe_favorites' AND policyname = 'Users can add their own favorites') THEN
    CREATE POLICY "Users can add their own favorites" 
      ON recipe_favorites 
      FOR INSERT 
      TO authenticated 
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'recipe_favorites' AND policyname = 'Users can delete their own favorites') THEN
    CREATE POLICY "Users can delete their own favorites" 
      ON recipe_favorites 
      FOR DELETE 
      TO authenticated 
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create indexes if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_recipe_favorites_user_id') THEN
    CREATE INDEX idx_recipe_favorites_user_id ON recipe_favorites(user_id);
  END IF;
  
  IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_recipe_favorites_recipe_id') THEN
    CREATE INDEX idx_recipe_favorites_recipe_id ON recipe_favorites(recipe_id);
  END IF;
END $$;