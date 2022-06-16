import { OkPacket } from 'mysql2';
import ClientError from "../03-Models/client-error";
import TagModel from "../03-models/tag-model";
import dal from "../04-dal/dal";

async function getAllTags(): Promise<TagModel[]> {
    const sql = "SELECT * FROM tags;";
    const tags = await dal.execute(sql);
    return tags;
} 

async function addTag(tag: TagModel): Promise<TagModel> {
    // validate:
    const errors = tag.validateTag();
    if(errors) throw new ClientError(400, errors);
    // check if tag exists:
    const allTags = await getAllTags();
    const tagExists = allTags.find(t => t.name === tag.name);
    if(tagExists) throw new ClientError(409, "Tag already exists");
    // if not, add:
    const sql = "INSERT INTO tags (name) VALUES (?);";
    const values = [tag.name];
    const added: OkPacket = await dal.execute(sql, values);
    tag.id = added.insertId;
    return tag;
}

async function deleteTag(tagId: number): Promise<void> {
    const sql = `DELETE FROM tags WHERE id=?`;
    const values = [tagId];
    const deleted: OkPacket = await dal.execute(sql, values);
    if(deleted.affectedRows === 0) throw new ClientError(404, "Tag not found");
}

export default {
    getAllTags,
    addTag,
    deleteTag
}