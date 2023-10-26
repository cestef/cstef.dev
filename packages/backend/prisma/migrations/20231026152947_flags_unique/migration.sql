/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Flag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Flag_name_key" ON "Flag"("name");
