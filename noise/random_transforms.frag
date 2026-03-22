#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st){
    vec2 ipos=floor(st);
    vec2 fpos=fract(st);

    float a=dot(random2(ipos),fpos);
    float b=dot(random2(ipos+vec2(1.,0.)),fpos-vec2(1.,0.));
    float c=dot(random2(ipos+vec2(0.,1.)),fpos-vec2(0.,1.));
    float d=dot(random2(ipos+vec2(1.,1.)),fpos-vec2(1.,1.));

    vec2 u=smoothstep(0.,1.,fpos);

    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float solid_rect(vec2 st,vec2 pos,float width,float height){
    pos-=vec2(width/2.,height/2.);
    float l=step(pos.x,st.x);
    float r=step(pos.x+width,st.x);
    float b=step(pos.y,st.y);
    float t=step(pos.y+height,st.y);
    return (l-r)*(b-t);
}

float cross(vec2 st, float size){
    return solid_rect(st,vec2(0.5),size,size/4.)+solid_rect(st,vec2(0.5),size/4.,size);
}

vec2 translate(vec2 st,vec2 offset){
    return st-offset;
}
vec2 rotate2d(vec2 st,float angle){
    st-=0.5;
    st=mat2(cos(angle),-sin(angle),
            sin(angle),cos(angle))*st;
    st+=0.5;
    return st; 
}
vec2 scale2d(vec2 st,vec2 scale){
    return mat2(scale.x,0,
            0,scale.y)*st;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(0.);

    //Random Translate
    st=translate(st,vec2(noise(st+sin(u_time)),noise(st+cos(u_time))));
    
    //Random Rotate
    st=rotate2d(st,noise(st+u_time));

    //Random Scale
    // st*=10.;
    // st=scale2d(st,vec2(noise(st+u_time)));
    // st=fract(st);

    color=vec3(cross(st,0.5));

    gl_FragColor=vec4(color,1.);
}