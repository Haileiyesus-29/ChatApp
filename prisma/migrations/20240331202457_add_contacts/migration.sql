-- CreateTable
CREATE TABLE "_Contact" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Contact_AB_unique" ON "_Contact"("A", "B");

-- CreateIndex
CREATE INDEX "_Contact_B_index" ON "_Contact"("B");

-- AddForeignKey
ALTER TABLE "_Contact" ADD CONSTRAINT "_Contact_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Contact" ADD CONSTRAINT "_Contact_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
