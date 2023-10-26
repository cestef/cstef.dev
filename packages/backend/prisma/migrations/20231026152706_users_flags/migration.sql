-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "githubId" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Flag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FlagToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "Flag_value_key" ON "Flag"("value");

-- CreateIndex
CREATE UNIQUE INDEX "_FlagToUser_AB_unique" ON "_FlagToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FlagToUser_B_index" ON "_FlagToUser"("B");

-- AddForeignKey
ALTER TABLE "_FlagToUser" ADD CONSTRAINT "_FlagToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Flag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlagToUser" ADD CONSTRAINT "_FlagToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
