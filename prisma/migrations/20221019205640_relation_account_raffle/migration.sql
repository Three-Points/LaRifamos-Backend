-- CreateTable
CREATE TABLE "_LikedRaffles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SharedRaffles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikedRaffles_AB_unique" ON "_LikedRaffles"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedRaffles_B_index" ON "_LikedRaffles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SharedRaffles_AB_unique" ON "_SharedRaffles"("A", "B");

-- CreateIndex
CREATE INDEX "_SharedRaffles_B_index" ON "_SharedRaffles"("B");

-- AddForeignKey
ALTER TABLE "_LikedRaffles" ADD CONSTRAINT "_LikedRaffles_A_fkey" FOREIGN KEY ("A") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedRaffles" ADD CONSTRAINT "_LikedRaffles_B_fkey" FOREIGN KEY ("B") REFERENCES "raffle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedRaffles" ADD CONSTRAINT "_SharedRaffles_A_fkey" FOREIGN KEY ("A") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedRaffles" ADD CONSTRAINT "_SharedRaffles_B_fkey" FOREIGN KEY ("B") REFERENCES "raffle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
