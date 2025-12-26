
import { GoogleGenAI, Type } from "@google/genai";

// Strictly adhering to GoogleGenAI initialization rules
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeOrderDescription = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `你是一个专业的电力运维质检专家。请分析以下电力运维工单描述是否符合业务规范，严禁在回复中提到任何AI模型名称或公司名称：\n\n"${description}"\n\n请返回JSON格式，包含：isValid (boolean), reason (string), score (0-100)。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: { type: Type.BOOLEAN },
            reason: { type: Type.STRING },
            score: { type: Type.NUMBER }
          },
          required: ["isValid", "reason", "score"]
        }
      }
    });
    // Extracting text output from GenerateContentResponse
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return null;
  }
};

export const generateQualityReport = async (stats: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `你是一个配网运维专家。基于以下统计数据生成一份简短的配网运维质量总结报告：\n${JSON.stringify(stats)}\n要求包含：总体态势评价、主要风险点、改进建议。严禁在回复中提到"Gemini"、"Google"或任何AI模型名称。`,
    });
    // Extracting text output from GenerateContentResponse
    return response.text;
  } catch (error) {
    return "无法生成智能报告，请检查网络连接。";
  }
};
